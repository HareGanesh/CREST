

export class UniversityTransEventApprovalList {

    public constructor(
	
	public Tran_Approval_ID: String,
	public Student_ID:String,
	public Prev_Approver_RID:Number,
	public Next_Approver_RID:Number,
	public Tran_Dt:String,
	public Student_Name:String,
	public Event_Title: String,
	public EventID:String,
	public Prev_Approver_RName:String,
	public Next_Approver_RName:String,
	public isChecked:boolean
	)
	{
		
	}
}