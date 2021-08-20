export class Cashdeposit {
    constructor(
        public Key?: string,
        public No?: string,
        public Posting_Date?: string,
        public Reference?: string,
        public Created_By?: string,
        public Amount?: number,
        public Cash_Deposit_Lines ?: { Cash_Deposit_Lines: [{

            Key?,
            Customer_Name?,
            Amount?,
            Select?,
            No?,

        }]}

    ) {}
}