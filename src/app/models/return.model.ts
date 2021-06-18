export class Return {
    constructor(
        public Key?: string,
        public No?: string,
        public Return_Date?: string,
        public Customer_No?: string,
        public Customer_Name?: string,
        public Applies_to_Invoice_No?: string,
        public Created_By?: string,
        public Created_On?: string,
        public POS_Return_Lines?: { POS_Return_Lines : [

            {
                Key?: string,
                No?: string,
                Item_No?: string,
                Description?: string,
                Store_Code?: string,
                Store_Name?: string,
                Quantity?: number,
                Price?: number,
                Amount?: number
            }
        ]
    }  ,
    ) {}
}