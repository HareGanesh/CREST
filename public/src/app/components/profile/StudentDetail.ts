
import { StudentProfessionalDetail } from './StudentProfessionalDetail';
import { StudentEducationDetail } from './StudentEducationDetail';

export class StudentDetail {

    public constructor(
	public Univ_Name:string,
    public Student_Name:string,
	public StudentID:string,
	public ProfessionalDetail:StudentProfessionalDetail[],
	public EducationDetail:StudentEducationDetail[],
	public Email_ID:string,
	public Address:string,
	public Mobile_No:string,
	public Student_Heading:string,
	public Student_Bio:string
	)
	{
		
	}
}
