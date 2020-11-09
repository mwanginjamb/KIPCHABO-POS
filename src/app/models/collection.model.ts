export class Collection {
  constructor(
    public Key?: string,
    public No?,
    public Posting_Date?,
    public Shade_No?,
    public Shade_Name?,
    public Farmer_No?,
    public Farmer_Name?,
    public Clerk_Name?,
    public Net_Kg?,
    public Gross_Kgs?,
    public Created_By?,
    public Farmers_Lines?: {
      Farmers_Lines: [
        {
          No?;
          Produce_Description?;
          Kgs?;
          Weighment_No?;
        }
      ];
    }
  ) {}
}
