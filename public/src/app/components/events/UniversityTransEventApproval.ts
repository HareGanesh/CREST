

export class UniversityTransEventApproval {

    public constructor(
	public UniversityID:Number,   
	public Priority:Number,
	public MaskID:Number,
	public Status:Number,	
	public TransMapID:Number,
	public StudentID:String,
	public EventID:String,
	public PrevApproverRoleID:Number,
	public NextApproverRoleID:Number,
	public TransApprovalID: String,
	public TransApprovalIDNumber: Number,
	public TransDt:String
	
	)
	{
		
	}
}
