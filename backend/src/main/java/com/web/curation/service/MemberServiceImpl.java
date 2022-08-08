package com.web.curation.service;

import com.web.curation.config.security.JwtTokenProvider;
import com.web.curation.data.dto.UserDto;
import com.web.curation.data.entity.RefreshToken;
import com.web.curation.data.entity.RoleType;
import com.web.curation.data.entity.User;
import com.web.curation.data.repository.RefreshTokenRepository;
import com.web.curation.data.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MemberServiceImpl implements MemberService {

    private final Logger LOGGER = LoggerFactory.getLogger(MemberServiceImpl.class);

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public MemberServiceImpl(UserRepository userRepository,
                             RefreshTokenRepository refreshTokenRepository,
                             JwtTokenProvider jwtTokenProvider,
                             PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    // 회원가입
    @Override
    public boolean register(UserDto registerUser) {
        LOGGER.info("[getSignUpResult] 회원 가입 정보 전달");
        User ssafy = userRepository.getByEmail("ssafy@naver.com");
//        LOGGER.info(registerUser.getUserName());
        String role = registerUser.getAuth();
        User user = new User();
//        user.setName(registerUser.getUserName());
        user.setEmail(registerUser.getEmail());
        user.setNickname(registerUser.getNickname());
        user.setPassword(passwordEncoder.encode(registerUser.getPassword()));
        user.setTel(registerUser.getTel());
        user.setBirth("");
        user.setProfileImg(ssafy.getProfileImg());
        user.setJoinDate(LocalDateTime.now());

        if (role.equalsIgnoreCase("admin")) {
            user.setRoleType(RoleType.ROLE_ADMIN);
        } else {
            user.setRoleType(RoleType.ROLE_USER);
        }

        User savedUser = userRepository.save(user);

        LOGGER.info("[getSignUpResult] userEntity 값이 들어왔는지 확인 후 결과값 주입");
        if (!savedUser.getUsername().isEmpty()) {
            LOGGER.info("[getSignUpResult] 정상 처리 완료");
            return true;
        } else {
            LOGGER.info("[getSignUpResult] 실패 처리 완료");
            return false;
        }
    }

    // 로그인
    @Override
    public UserDto login(UserDto loginUser) throws RuntimeException {
        LOGGER.info("[getSignInResult] signDataHandler 로 회원 정보 요청");

        User user = userRepository.getByEmail(loginUser.getEmail());
        LOGGER.info("[getSignInResult] Id : {}", loginUser.getEmail());
        
        LOGGER.info("[getSignInResult] 패스워드 비교 수행");
        if (!passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
            throw new RuntimeException();
        }

        LOGGER.info("[getSignInResult] UserDto 객체 생성");

        UserDto userDto = new UserDto();

        String access = jwtTokenProvider.createAccessToken(String.valueOf(user.getEmail()), user.getRoleType());
        String refresh = jwtTokenProvider.createRefreshToken(String.valueOf(user.getEmail()));

        userDto.setAccessToken(access);
        userDto.setRefreshToken(refresh);

        return userDto;
    }

    // 회원 정보 조회
    @Override
    public UserDto userInfo(String email) {
        UserDto userDto = new UserDto();
        User user = userRepository.getByEmail(email);

//        userDto.setUserName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setNickname(user.getNickname());
//        userDto.setPassword(user.getPassword()); ==> 이 값은 여기서 안줘도 될거 같음
        userDto.setTel(user.getTel());
        userDto.setBirth(user.getBirth());
        userDto.setProfileImg(user.getProfileImg());
        userDto.setJoinDate(user.getJoinDate());
        userDto.setAuth(String.valueOf(user.getRoleType()));

        return userDto;
    }

    @Override
    public String getRefreshToken(String email) {

        String refresh = refreshTokenRepository.findByUserId(email).get().getToken();

        return refresh;
    }

    @Override
    public RoleType getRole(String email) {
        RoleType role = userRepository.getByEmail(email).getRoleType();
        return role;
    }

    // 회원 탈퇴
    @Override
    public boolean deleteUser(String email) {

        User user = userRepository.getByEmail(email);
        userRepository.delete(user);

        User check = userRepository.getByEmail(email);
        if(check == null) return true;
        else return false;

    }

    // 회원정보 수정
    @Override
   public boolean updateUser(UserDto userDto) {

        User user = userRepository.getByEmail(userDto.getEmail());

        user.setNickname(userDto.getNickname());
        user.setTel(userDto.getTel());
        user.setBirth(userDto.getBirth());

        userRepository.save(user);

        if(user.getNickname().equals(userDto.getNickname()) && user.getTel().equals(userDto.getTel())
                && user.getBirth().equals(userDto.getBirth())){
            return true;
        }
        return false;

    }

    @Override
    public boolean updateUserProfile(UserDto userDto) {
        User user = userRepository.getByEmail(userDto.getEmail());

        user.setProfileImg(userDto.getProfileImg());

        userRepository.save(user);

        if(user.getProfileImg().equals(userDto.getProfileImg())){
            return true;
        }
        return false;
    }

    // 비밀번호 변경
    @Override
    public boolean updatePsssword(String email, String password) {
        User user = userRepository.getByEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        userRepository.save(user);
        if(passwordEncoder.matches(password, user.getPassword())) return true;
        else return false;
    }

    // 비밀번호 맞는지 확인
    @Override
    public boolean checkPassword(String email, String password) {
        User user = userRepository.getByEmail(email);

        if(passwordEncoder.matches(password, user.getPassword())) return true;
        else return false;
    }

    @Override
    public String findId(String tel) {

        if(userRepository.existsByTel(tel)) {
            String email = userRepository.getByTel(tel).getEmail();
            return email;
        }
        return "fail";
    }
}
