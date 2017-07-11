export class StudentProfessionalDetail {

    public constructor(
	public EmployerName:string,
	public DurationStartMonth:number,
	public DurationEndMonth:number,
	public DurationStartYear:number,
	public DurationEndYear:number,
	public Designation:string,
	public JobProfile:string,
	public FullTimeOrPartTime:String,
	public CurrentEmployer:boolean
	)
	{
		
	}
}