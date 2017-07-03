

export class universityEventApprovalHistory {

    public constructor(
	public TranApprovalHistoryID:Number,
	public ApprovedBy:String,   
	public ApprovedOn:Date,
	public MaskID:Number,
	public Status:Number,	
	public Comments:String,	
	public TransApprovalID: String
	
	)
	{
		
	}
}
