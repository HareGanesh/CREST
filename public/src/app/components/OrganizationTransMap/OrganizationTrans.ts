 import { OrganizationRole } from './OrganizationRole';
import { OrganizationTransMask } from './OrganizationTransMask';
import { OrganizationTransMap } from './OrganizationTransMap';

export class OrganizationTrans {

    public constructor(
	public OrganizationID:Number,
    public TransTypeID:Number,    
	public Roles:OrganizationRole[],
	public TransMask:OrganizationTransMask[],
	public TransMap:OrganizationTransMap[],
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
