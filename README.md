Please add me as a Agent Developer [Published] on Discord, my username is AlkH#9569
# Forta Agent Protocol Blacklist

## Description

This agent detects when blakc listed address trying to move funds to L2 (MATIC, Optimism or Arbitrum)

## Supported Chains

- Ethereum
- List any other chains this agent can support e.g. BSC

## Alerts

Describe each of the type of alerts fired by this agent

- FORTA-2
  - Fired when a transaction contains blacklisted address and address of one of the bridges (MATIC, Optimism or Arbitrum)
  - Severity is always set to "high" (mention any conditions where it could be something else)
  - Type is always set to "suspicious" (mention any conditions where it could be something else)

## Test Data
https://etherscan.io/tx/0x994a1852a648adc68fca4cf3897b49684a2751c94303556e1805b2a893b656cb
https://etherscan.io/tx/0x8ac173b486dd1a34ba9a6003888173b1acc2188d34481a9b486169ddb9547fc5
