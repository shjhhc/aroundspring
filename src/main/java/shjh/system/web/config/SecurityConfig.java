package shjh.system.web.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Created by m on 2016/11/7.
 */
//@Configuration
//@EnableWebMvcSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    @Qualifier("accountUserDetailsService")
    private UserDetailsService userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Override
    protected UserDetailsService userDetailsService() {
        return userDetailsService;
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        super.configure(web);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        //将login.jsp定为登陆页面，只处理/login这个请求
        .formLogin().loginPage("/login.jsp")
                .and()
                .formLogin().loginProcessingUrl("/login")
                .and()
                .formLogin().defaultSuccessUrl("/home")
                .and()
                        //如果登陆成功就跳转到/home这个地址，如果失败就跳转到/?error=1
                .formLogin().failureUrl("/?error=1")
                .and()
//        这里配置的是登出的请求
        .logout().logoutUrl("/logout")
//        登陆成功后跳转的地址，以及删除的cookie名称
                .and().logout().logoutSuccessUrl("/")
                .and().logout().deleteCookies("JSESSIONID")
                .and()
//        配置记住我的过期时间
        .rememberMe().tokenValiditySeconds(1209600)
                .and();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
