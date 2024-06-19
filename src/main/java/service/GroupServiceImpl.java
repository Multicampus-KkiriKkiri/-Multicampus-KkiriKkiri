package service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.GroupDAO;
import dto.GroupDTO;

@Service
public class GroupServiceImpl implements GroupService {

	@Autowired
	GroupDAO dao;

	@Override
	public GroupDTO getGroupDetail(int groupId) {
		return dao.getGroupDetail(groupId);
	}

}
