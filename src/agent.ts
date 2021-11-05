import { 
  Finding, 
  HandleTransaction, 
  TransactionEvent, 
  FindingSeverity, 
  FindingType 
} from 'forta-agent'

const BLACKLIST = [
  "0xe5ec1103810217a3f83262c66c6a38a8e6387366",
  "0xc659e9f52d98f1cddbb6b80130e99faeb6c91f41",
  "0xb971e97ded1b0e61f0c399852f811284b54daee1"
]

const INTERESTING_PROTOCOLS = [
  "0xcee284f754e854890e311e3280b767f80797180d", // Arbitrum bridge
  "0x40ec5b33f54e0e8a33a975908c5ba1c14e5bbbdf", // Matci bridge
  "0x99c9fc46f92e8a1c0dec1b1747d010903e884be1"  // Optimism bridge
]

// report finding if any addresses involved in transaction are blacklisted
const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
	const findings: Finding[] = []

	const blacklistedAddress = BLACKLIST.find((address) => txEvent.addresses[address])
	if (!blacklistedAddress) return findings
	  
	const protocolAddress = INTERESTING_PROTOCOLS.find((address) => txEvent.addresses[address])
	if (!protocolAddress) return findings

	findings.push(
		Finding.fromObject({
			name: "Blacklisted Address moved assets to L2",
			description: `The blacklisted address: ${blacklistedAddress} moved assets to L2 thru bridge ${protocolAddress}`,
			alertId: "FORTA-2",
			type: FindingType.Suspicious,
			severity: FindingSeverity.High,
			metadata: {
				address: blacklistedAddress,
				protocol: protocolAddress
			}
		}
	))
  return findings
}

export default {
  handleTransaction
}
