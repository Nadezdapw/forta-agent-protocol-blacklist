import { 
  Finding,
  FindingSeverity,
  FindingType,
  HandleTransaction,
  createTransactionEvent
} from "forta-agent"
import agent from "./agent"

describe("blacklisted address agent", () => {
	let handleTransaction: HandleTransaction;

	const createTxEventWithAddresses = (addresses: {[addr: string]: boolean}) => createTransactionEvent({
		transaction: {} as any,
		receipt: {} as any,
		block: {} as any,
		addresses
	})

	beforeAll(() => {
		handleTransaction = agent.handleTransaction
	})

	describe("handleTransaction", () => {
		it("returns empty findings if no blacklisted address is involved", async () => {
			const txEvent = createTxEventWithAddresses({})
			const findings = await handleTransaction(txEvent)
			expect(findings).toStrictEqual([])
		})

		it("returns empty findings if blacklisted address interacted with something else", async () => {
                        const txEvent = createTxEventWithAddresses({["0xe5ec1103810217a3f83262c66c6a38a8e6387366"]: true})
                        const findings = await handleTransaction(txEvent)
                        expect(findings).toStrictEqual([])
                })


                it("returns empty findings if other addresses interacted with protocols", async () => {
                        const txEvent = createTxEventWithAddresses({["0xcee284f754e854890e311e3280b767f80797180d"]: true})
                        const findings = await handleTransaction(txEvent)
                        expect(findings).toStrictEqual([])
                })


		it("returns a finding if a blacklisted address is involved", async () => {
			const address = "0xe5ec1103810217a3f83262c66c6a38a8e6387366";
			const protocol = "0xcee284f754e854890e311e3280b767f80797180d";
			const txEvent = createTxEventWithAddresses({ [address]: true , [protocol]: true})

			const findings = await handleTransaction(txEvent)

			expect(findings).toStrictEqual([
        
			Finding.fromObject({
				name: "Blacklisted Address moved assets to L2",
				description: `The blacklisted address: ${address} moved assets to L2 thru bridge ${protocol}`,
				alertId: "FORTA-2",
				type: FindingType.Suspicious,
				severity: FindingSeverity.High,
				metadata: {
					address: address,
					protocol: protocol
				}
				})
			])
		})
	})
})
