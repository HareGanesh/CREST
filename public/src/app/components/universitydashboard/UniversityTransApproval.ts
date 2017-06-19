

export class UniversityTransApproval {

    public constructor(
	public UniversityID:Number,   
	public Priority:Number,
	public MaskID:Number,
	public Status:Number,	
	public TransMapID:Number,
	public StudentID:String,
	public PrevApproverRoleID:Number,
	public NextApproverRoleID:Number,
	public TransApprovalID: String,
	public TranApprovalIDNumber:Number,
	public TransDt:String
	
	)
	{
		
	}
}
