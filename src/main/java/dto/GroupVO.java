package dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Component
public class GroupVO {
	
	//group table
	private int groupId;
	private int groupInterestId;
	private int groupRegionId;
	private int groupDistrictId;
	private String groupName;
	private String groupImage;
	private String groupType;
	
	//interest table
	private int interestId;
	
	//regions table
	private int regionId;
	private String regionName;
	
	//districts table
	private int districtId;
	private String districtName;
}
