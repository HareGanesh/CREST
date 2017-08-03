

export class OrganizationTransEventApprovalList {

    public constructor(
	
	public Tran_Approval_ID: String,
	public Employee_ID:String,
	public Prev_Approver_RID:Number,
	public Next_Approver_RID:Number,
	public Tran_Dt:String,
	public Employee_Name:String,
	public Event_Title: String,
	public EventID:String,
	public Prev_Approver_RName:String,
	public Next_Approver_RName:String,
	public isChecked:boolean
	)
	{
		
	}
}