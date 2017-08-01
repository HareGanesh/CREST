 import { UniversityRole } from './UniversityRole';
import { UniversityTransMask } from './UniversityTransMask';
import { UniversityTransMap } from './UniversityTransMap';

export class UniversityTrans {

    public constructor(
	public UniversityID:Number,
    public TransTypeID:Number,    
	public Roles:UniversityRole[],
	public TransMask:UniversityTransMask[],
	public TransMap:UniversityTransMap[],
	public NoOfLevel:Number,
	public TransMapID:Number,
	public Created_On:Date,
	public Created_by:String,
	public Modified_On:Date,
	public Modified_by:String,
	public TransFlowStartDate:Date,
	public TransFlowEndDate:Date
	)
	{
		
	}
}
