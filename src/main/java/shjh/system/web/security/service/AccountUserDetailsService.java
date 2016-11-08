package shjh.system.web.security.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import shjh.module.account.bean.domain.Stu;
import shjh.module.account.service.StuService;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by m on 2016/11/7.
 */
@Service
public class AccountUserDetailsService implements UserDetailsService {
    private final Logger logger = LoggerFactory.getLogger(AccountUserDetailsService.class);

    @Autowired
    private StuService stuService;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Stu stu = stuService.queryStuByName(s);
        return new User(stu.getName(), "123456", true, true, true, true, getGrantedAuthorities(stu));
    }

    private List<GrantedAuthority> getGrantedAuthorities(Stu stu) {
        List<GrantedAuthority> authorities = new ArrayList<>();

//        for(UserProfile userProfile : user.getUserProfiles()){
//            logger.info("UserProfile : {}", userProfile);
//            authorities.add(new SimpleGrantedAuthority("ROLE_"+userProfile.getType()));
//        }
        authorities.add(new SimpleGrantedAuthority("ROLE_READ"));
        authorities.add(new SimpleGrantedAuthority("ROLE_WRITE"));
        logger.info("authorities : {}", authorities);
        return authorities;
    }
}
