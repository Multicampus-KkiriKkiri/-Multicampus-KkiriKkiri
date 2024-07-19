package dto;



import java.sql.Timestamp;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*
 * @ToString(exclude ="이름")으로 제외가능?
 * 
 * @Setter는 그 의도가 분명하지 않고 객체를 언제든지 변경할 수 있는 상태가 되어서 객체의 안전성이 보장받기 힘들다.
 * @Getter는 사용하되 최대한 객체가 캡슐화하여 해당 객체가 그 기능을 제공해주는 것이 바람직.
 * @NoArgsConstructor 접근 권한을 최소화 하자
 * */
@Getter
@Setter
@ToString
@Component
public class GroupDTO {
    private int groupId;//그룹 고유 id
    private int groupLeaderId;//모임장 id
    private String groupName;//모임 이름
    private String groupDetail;//모임 설명
    private String groupImage; //저장하는 파일의 위치를 저장해서.
    private String groupType;//온,오프라인
    private int groupRegionId;//지역
    private int groupDistrictId;//지역
    private int groupInterestId; //모임 가테고리
    private String groupSignUpType;//승인제,선착순
    private int groupMaximum;//모임 최대 인원수
    private String groupSignUpQuestion; //가입시 질문
    private Timestamp lastUpdateTime;//모임등록시간
}

