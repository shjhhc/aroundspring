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
import shjh.system.web.security.service.AccountUserDetailsService;

/**
 * Created by m on 2016/11/7.
 */
@Configuration
@EnableWebMvcSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private AccountUserDetailsService accountUserDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(accountUserDetailsService);
    }

    @Override
    protected UserDetailsService userDetailsService() {
        return accountUserDetailsService;
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        super.configure(web);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        //��login.jsp��Ϊ��½ҳ�棬ֻ����/login�������
        .formLogin().loginPage("/login.jsp")
                .and()
                .formLogin().loginProcessingUrl("/login")
                .and()
                .formLogin().defaultSuccessUrl("/home")
                .and()
                        //�����½�ɹ�����ת��/home�����ַ�����ʧ�ܾ���ת��/?error=1
                .formLogin().failureUrl("/?error=1")
                .and()
//        �������õ��ǵǳ�������
        .logout().logoutUrl("/logout")
//        ��½�ɹ�����ת�ĵ�ַ���Լ�ɾ����cookie����
                .and().logout().logoutSuccessUrl("/")
                .and().logout().deleteCookies("JSESSIONID")
                .and()
//        ���ü�ס�ҵĹ���ʱ��
        .rememberMe().tokenValiditySeconds(1209600)
                .and();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
