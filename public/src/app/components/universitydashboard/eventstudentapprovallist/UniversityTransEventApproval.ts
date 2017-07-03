

export class UniversityTransEventApproval {

    public constructor(
	public UniversityID:Number,   
	public Priority:number,
	public MaskID:Number,
	public Status:Number,	
	public TransMapID:Number,
	public StudentID:String,
	public EventID:String,
	public PrevApproverRoleID:Number,
	public NextApproverRoleID:Number,
	public TransApprovalID: String,
	public TranApprovalIDNumber:Number,
	public TransDt:String
	
	)
	{
		
	}
}
