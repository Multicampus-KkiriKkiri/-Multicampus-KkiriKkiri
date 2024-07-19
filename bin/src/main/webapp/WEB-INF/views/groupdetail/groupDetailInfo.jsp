<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
	<section class="tapPageSection" id="infoTapPageSection" >
			<div id="groupDescriptionDiv">
				<div class="groupDetailheaderDiv" id="groupInfoHeader">
				  		<span>모임 설명</span>
				</div>
	            <div>${groupDTO.groupDetail}</div>
			</div>
			<div id="groupMembersDiv">
				<div>
					<div class="groupDetailheaderDiv" id="leaderInfoHeader">
				  		<span>모임장</span>
				  	</div>
					<div id="leaderInfoDiv">
						<div id="leaderImageDiv">
							<img id="leaderImg" src="${groupLeaderDTO.profileImage}" alt="${groupLeaderDTO.userNickname}">
						</div>
						<div id="leaderNicknameDiv">
							${groupLeaderDTO.userNickname}
						</div>
					</div>
				</div>
				<div>
				  	<div class="groupDetailheaderDiv" id="memberListHeader">
				  		<span>모임원</span>
				  		<button id="toggleMembersBtn"></button>
				  	</div>
		            <div id="memberListDiv">
		            	<!-- groupDetail.js -->
		            </div>
				</div>
			</div>
	</section>
</html>