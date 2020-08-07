export class Receipt {
    constructor(
        public Key?: string,
        public Receipt_No?,
        public Posting_Date?,
        public Receive_From_Customer_No?,
        public Customer_Name?,
        public Receiving_Bank_Account_No?,
        public Bank_Account_Name?,
        public Amount_To_Receive?,
        public Start_Date?,
        public End_Date?,
        public Total_Balance?,
        public Total_Amount?,
        public Created_By?,
        public Created_On?,
        public Posted?: boolean,
        public Cash_Receipt_Line?: { Cash_Receipt_Line: [{
            Amount?, Amount_To_Receipt?, Amount_WthHold?, Customer_Name?, Customer_No?,
            Invoice_No?,Key?, Remaining_Amount?, Select?: boolean, Tax_WithHold?, V_A_T_Percent?, Receipt_No?, Line_No?
        }]}

    ) {}
}