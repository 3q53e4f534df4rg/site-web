(() => {
  const form = document.querySelector('#subnet-form');
  if (!form) return;

  const ipInput = document.querySelector('#ipAddress');
  const cidrInput = document.querySelector('#cidrMask');
  const cidrDisplay = document.querySelector('#cidrDisplay');
  const resetBtn = document.querySelector('#resetSubnet');
  const loading = document.querySelector('#subnetLoading');

  const outputs = {
    networkId: document.querySelector('#networkId'),
    broadcastAddress: document.querySelector('#broadcastAddress'),
    firstHost: document.querySelector('#firstHost'),
    lastHost: document.querySelector('#lastHost'),
    totalHosts: document.querySelector('#totalHosts'),
    subnetMask: document.querySelector('#subnetMask'),
    wildcardMask: document.querySelector('#wildcardMask'),
  };

  const toInt = (ipParts) =>
    ipParts.reduce((acc, octet) => ((acc << 8) | octet) >>> 0, 0);

  const toIp = (num) =>
    [24, 16, 8, 0].map((shift) => (num >>> shift) & 255).join('.');

  const isValidIp = (ip) => {
    const parts = ip.trim().split('.');
    if (parts.length !== 4) return false;
    return parts.every((p) => /^\d+$/.test(p) && Number(p) >= 0 && Number(p) <= 255);
  };

  const compute = (ip, cidr) => {
    const ipInt = toInt(ip.split('.').map(Number));
    const mask = cidr === 0 ? 0 : ((0xffffffff << (32 - cidr)) >>> 0);
    const wildcard = (~mask) >>> 0;
    const network = ipInt & mask;
    const broadcast = network | wildcard;

    const hostCount = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(2 ** (32 - cidr) - 2, 0);
    const firstHost = cidr >= 31 ? network : network + 1;
    const lastHost = cidr >= 31 ? broadcast : broadcast - 1;

    return {
      networkId: toIp(network),
      broadcastAddress: toIp(broadcast),
      firstHost: toIp(firstHost >>> 0),
      lastHost: toIp(lastHost >>> 0),
      totalHosts: String(hostCount),
      subnetMask: toIp(mask),
      wildcardMask: toIp(wildcard),
    };
  };

  const render = (result) => {
    Object.entries(result).forEach(([key, value]) => {
      outputs[key].textContent = value;
    });
  };

  const setLoading = (state) => {
    loading.hidden = !state;
  };

  cidrInput.addEventListener('input', () => {
    cidrDisplay.textContent = `/${cidrInput.value}`;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const ip = ipInput.value;
    const cidr = Number(cidrInput.value);

    if (!isValidIp(ip)) {
      alert('Adresse IP invalide. Exemple valide : 192.168.1.0');
      ipInput.focus();
      return;
    }

    if (cidr < 1 || cidr > 32) {
      alert('Le CIDR doit être entre /1 et /32');
      cidrInput.focus();
      return;
    }

    setLoading(true);
    setTimeout(() => {
      render(compute(ip, cidr));
      setLoading(false);
    }, 250);
  });

  resetBtn.addEventListener('click', () => {
    form.reset();
    cidrInput.value = '24';
    cidrDisplay.textContent = '/24';
    render({
      networkId: '-',
      broadcastAddress: '-',
      firstHost: '-',
      lastHost: '-',
      totalHosts: '-',
      subnetMask: '-',
      wildcardMask: '-',
    });
  });
})();
