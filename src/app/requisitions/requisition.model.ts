export class Requisition {
    constructor(
        public Key?: string,
        public Req_No?: string,
        public Requisition_Date?: string,
        public Requested_By?: string,
        public Requested_On?: string,
        public Store_Code?: string,
        public Store_Name?: string,
        public Approval_Status?: string,
        public Point_Of_Sale_Request_Lines?: { Point_Of_Sale_Request_Lines : [

            {
                 Key?,
                 Item_No?,
                 Description?,
                 U_O_M?,
                 Available_Stock_Kgs?,
                 Available_Stock_pieces? ,
                 Pieces_To_Request?, 
                 Line_No?
            }
            
        ]}  ,
    ) {}
}