

export class UniversityTransApprovalList {

    public constructor(
	
	public Tran_Approval_ID: String,
	public Student_ID:String,
	public Prev_Approver_RID:Number,
	public Next_Approver_RID:Number,
	public Tran_Dt:String,
	public Student_Name:String
	)
	{
		
	}
}