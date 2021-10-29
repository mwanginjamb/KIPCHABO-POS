export class Requisitionline {
    constructor(

        public Item_No?: string,
        public Description?: string,
        public U_O_M?: string,
        public Quantity_To_Request?: number,
        public Pieces_In_qty_Requested?: number,
        public Available_Stock_Kgs?: number,
        public Available_Stock_pieces?: number,
        public Total_Bags_Cartons?: number,
        public Line_No?: any,
        public Req_No?: string

    ) {}
}