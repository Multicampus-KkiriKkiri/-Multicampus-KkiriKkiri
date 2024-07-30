<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
	<section class="tapPageSection" id="infoTapPageSection" >
			<div id="groupDescriptionDiv">
				<div class="groupInfoHeaderDiv" id="groupInfoHeader">
				  		<span>모임 설명</span>
				</div>
	            <div class="groupInfoSectionDiv">
	            	${groupDTO.groupDetail}
	            </div>
			</div>
			<div id="groupMembersDiv">
				<div>
					<div class="groupInfoHeaderDiv" id="leaderInfoHeader">
				  		<span>모임장</span>
				  	</div>
					<div id="leaderInfoDiv" class="groupInfoSectionDiv">
						<div id="leaderImageDiv">
							<img id="leaderImg" src="/upload/${groupLeaderDTO.profileImage}" alt="${groupLeaderDTO.userNickname}">
						</div>
						<div id="leaderNicknameDiv">
							${groupLeaderDTO.userNickname}
						</div>
					</div>
				</div>
				<div>
				  	<div class="groupInfoHeaderDiv" id="memberListHeader">
				  		<span>모임원(${groupMemberCnt - 1})</span>
				  		<button id="toggleMembersBtn"></button>
				  	</div>
		            <div id="memberListDiv"  class="groupInfoSectionDiv">
		            	<!-- 모임원 목록(groupDetail.js) -->
		            </div>
				</div>
			</div>
	</section>
</html>