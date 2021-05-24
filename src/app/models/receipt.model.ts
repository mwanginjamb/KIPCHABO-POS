export class Receipt {
    constructor(
        public Key?: string,
        public POS_Receipt_No?: string,
        public Receipt_Date?: string,
        public Customer_No?: string,
        public Customer_Name?: string,
        public Bank_Account_No?: string,
        public Bank_Account_Name?: string,
        public Global_Dimension_1_Code?: string,
        public Reference_No?: string,
        public Total_Amount?: string,
        public POS_Receipt_Lines?: { POS_Receipt_Lines: [{

            Key?,
            Item_No?,
            Description?,
            Store_Code?,
            Store_Name?,
            Qty?,
            Price?,
            Total_Amount?,

        }]}

    ) {}
}