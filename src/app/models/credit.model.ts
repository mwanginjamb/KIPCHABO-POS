export class Credit {
    constructor(
        public Key?: string,
        public No?: string,
        public Sale_Date?: string,
        public Customer_No?: string,
        public Customer_Name?: string,
        public Type_Of_Sale?: string,
        public Global_Dimension_1_Code?: string,
        public Store_Code?: string,
        public Store_Name?: string,
        public Total_Amount?: number,
        public POS_Sales_Lines?: { POS_Sales_Lines: [{

            Key?: string,
            Item_No?: string,
            Description?: string,
            Qty?: number,
            Unit_Price?: number,
            Amount?: number,

        }]}

    ) {}
}