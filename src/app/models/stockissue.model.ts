export class Stockissue {
    constructor(
        public Key?: string,
        public Stock_Issue_No?: string,
        public Posting_Date?: string,
        public Receipt_Date?: string,
        public Order_No?: string,
        public Issued_From_Store_Code?: string,
        public Store_Name?: string,
        public In_Transit_Store?: string,
        public Receiving_Store_Code?: string,
        public Receiving_Store_Name?: string,
        public Global_Dimension_1_Code?: string,
        public Issued_By?: string,
        public Issued_Name?: string,
        public Received_By?: string,
        public Sales_Rep_Name?: string,
        public Point_Of_Sale_Issue_Line_Ship?: { Point_Of_Sale_Issue_Line_Ship : [

            {
                Key?,
                Item_No?,
                Description?,
                Requested_Pieces?,
                Issued_Pieces?,
                Pieces_Received?,
                Stock_Issue_No?
            }
        ]
    }  ,
    ) {}
}