import { EventRule } from './eventRule';
import { EventPrize } from './eventPrize';
import { EventOrganizer } from './eventOrganizer';
export class Event {

    public constructor(
	public EventTitle:String,public Description:String,public CategoriesMstr:String,public CategoriesSubMstr:String,public StartDt:Date,
    public EndDt:Date,
	public EventRegisterEndDt:Date,
    public EventType:String,
    public POCRequired:String,
    public POCDeadLine:String,
    public Location:String,
    public Status:String,
    //public Rules:String,
    public Event_Logo:String,
    //public Prizes:Number,
	public Rules:EventRule[],
	public Prizes:EventPrize[],
	public Organizers:EventOrganizer[],
	public Created_On:Date,
	public Created_by:String,
	public Modified_On:Date,
	public Modified_by:String,
	public Organizations:any[],
	public Universities:any[]
	)
	{
		
	}
}
