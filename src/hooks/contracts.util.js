export const NETWORK_AGENT_ADDR = '0x5E8c17A6065C35b172B10E80493D2266e2947DF4';
export const NETWORK_RESERVE_ADDR = '0xec0dd1579551964703246becfbf199c27cb84485';
export const ANT_ADDR_MAINNET = '0x960b236A07cf122663c4303350609A66A7B288C0';
export const ANJ_ADDR_MAINNET = '0xcD62b1C403fa761BAadFC74C525ce2B51780b184';

export const DECIMALS = 18;

export const ANT_ANJ_TOKEN_CONTRACT_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_blockNumber', type: 'uint256' },
    ],
    name: 'balanceOfAt',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    type: 'function',
  },
];
