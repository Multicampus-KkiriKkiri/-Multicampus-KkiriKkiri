package dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class GroupDTO2 extends GroupDTO{
	String regionName;
	String districtName;
}
