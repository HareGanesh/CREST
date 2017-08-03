

export class OrganizationTransEventApproval {

    public constructor(
	public OrganizationID:Number,   
	public Priority:number,
	public MaskID:Number,
	public Status:Number,	
	public TransMapID:Number,
	public EmployeeID:String,
	public EventID:String,
	public PrevApproverRoleID:Number,
	public NextApproverRoleID:Number,
	public TransApprovalID: String,
	public TranApprovalIDNumber:Number,
	public TransDt:String,
	public TranscationStatus:String
	
	)
	{
		
	}
}
