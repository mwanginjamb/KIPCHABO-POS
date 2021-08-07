export class Cashreceiptline {
    constructor(
        public Key?: string,
        public Item_No?: string,
        public Description?: string,
        public Store_Code?: string,
        public Store_Name?: string,
        public Qty?: number,
        public Price?: number,
        public Total_Amount?: number,
        public POS_Receipt_No?: string,
        public Stock_Balance?: number,
    ) {}
}
