export class Itembalance {
    constructor(
        public No?,
        public ItemPeriodLength?,
        public AmountType?,
        public ItemAvailLocLines?: { Item_Avail_by_Location_Lines?: [
            {
                 Key?,
                 Code?,
                 Name?,
                 GrossRequirement?,
                 ScheduledRcpt?,
                 PlannedOrderRcpt?,
                 ProjAvailableBalance?,
                 Item_Inventory?,
                 Item_Qty_on_Purch_Order?,
                 Item_Qty_on_Sales_Order?,
                 Item_Qty_on_Service_Order?,
                 Item_Qty_on_Job_Order?,
                 Item_Trans_Ord_Shipment_Qty?,
                 Item_Qty_on_Asm_Component?,
                 Item_Qty_on_Assembly_Order?,
                 Item_Qty_in_Transit?,
                 Item_Trans_Ord_Receipt_Qty?,
                 ExpectedInventory?,
                 QtyAvailable?,
                 Item_Scheduled_Receipt_Qty?,
                 Item_Scheduled_Need_Qty?,
                 PlannedOrderReleases?,
                 Item_Net_Change?,
            }
        ] }
    ){}
}