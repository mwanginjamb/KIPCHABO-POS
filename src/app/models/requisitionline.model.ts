export class Requisitionline {
    constructor(
        public Key: string = '',
        public Document_No: string = '',
        public Line_No: string = '',
        public Item_No: string = '',
        public Variant_Code = '',
        public Planning_Flexibility = '',
        public Description = '',
        public Unit: string = '',
        public Unit_Weight: number = 0,
        public Pieces: number = 0 ,
        public Transfer_from_Bin_Code = '',
        public Transfer_To_Bin_Code = '',
        public Quantity: number = 0,
        public Reserved_Quantity_Inbnd: number = 0,
        public Reserved_Quantity_Shipped: number = 0,
        public Reserved_Quantity_Outbnd: number = 0,
        public Unit_of_Measure_Code = '',
        public Unit_of_Measure = '',
        public Qty_to_Ship: number = 0,
        public Quantity_Shipped: number = 0,
        public Qty_to_Receive: number = 0,
        public Quantity_Received: number = 0,
        public Shipment_Date = '',
        public Receipt_Date = '',
        public Shipping_Agent_Code = '',
        public Shipping_Agent_Service_Code = '',
        public Shipping_Time = '',
        public Outbound_Whse_Handling_Time = '',
        public Inbound_Whse_Handling_Time = '',
        public Appl_to_Item_Entry = '',
        public Shortcut_Dimension_1_Code = '',
        public Shortcut_Dimension_2_Code = '',
        public ShortcutDimCode_x005B_3_x005D_ = '',
        public ShortcutDimCode_x005B_4_x005D_ = '',
        public ShortcutDimCode_x005B_5_x005D_ = '',
        public ShortcutDimCode_x005B_6_x005D_ = '',
        public ShortcutDimCode_x005B_7_x005D_ = '',
        public ShortcutDimCode_x005B_8_x005D_ = '',
      

    ) {}
}