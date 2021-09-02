export class Receipt {
    constructor(
        public Key?: string,
        public POS_Receipt_No?: string,
        public Receipt_Date?: string,
        public Type_Of_Sale?: string,
        public Customer_No?: string,
        public Customer_Name?: string,
        public Bank_Account_No?: string,
        public Bank_Account_Name?: string,
        public Global_Dimension_1_Code?: string,
        public Reference_No?: string,
        public Price_Group?: string,
        public Total_Amount?: number,
        public Created_By?: string,
        public Balance_Amount?: number,
        public $VAT_Amount?: number,
        public $Amount_Inc_VAT?: number,
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