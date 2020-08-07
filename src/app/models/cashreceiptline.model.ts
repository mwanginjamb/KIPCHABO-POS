export class Cashreceiptline {
    constructor(
        public Key?,
        public Customer_No?,
        public Customer_Name?,
        public Invoice_No?,
        public External_Document_No?,
        public Amount?,
        public Amount_To_Receipt?,
        public Amount_WthHold?,
        public Remaining_Amount?,
        public Select?: boolean,
        public Description?,
        public Tax_WithHold?,
        public V_A_T_Percent?,
        public Reference_No?,
        public Receipt_No?,
        public Line_No?
    ) {}
}
