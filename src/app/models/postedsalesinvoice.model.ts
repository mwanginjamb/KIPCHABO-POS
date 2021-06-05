export class Postedsalesinvoice {
    constructor(
        public Key?: string,
        public No?,
        public Customer_No?,
        public Customer_Name?,
        public Posting_Date?,
        public Amount?,       
        public SalesInvLines?: { Posted_Sales_Invoice_Line: [
            {
                 Key?,
                 Type?,
                 No?,
                 Cross_Reference_No?,
                 IC_Partner_Code?,
                 Variant_Code?,
                 Description?,
                 Return_Reason_Code?,
                 Quantity?,
                 Unit_of_Measure_Code?,
                 Unit_of_Measure?,
                 Unit_Cost_LCY?,
                 Unit_Price?,
                 Line_Amount?,
                 Line_Discount_Percent?,
                 Line_Discount_Amount?,
                 Allow_Invoice_Disc?,
                 Job_No?,
                 Job_Task_No?,
                 Job_Contract_Entry_No?,
                 Appl_to_Item_Entry?,
                 Deferral_Code?,
                 Shortcut_Dimension_1_Code?,
                 Shortcut_Dimension_2_Code?,
                 Invoice_Discount_Amount?,
                 Total_Amount_Excl_VAT?,
                 Total_VAT_Amount?,
                 Total_Amount_Incl_VAT?,
            }
        ]}

    ) {}
}