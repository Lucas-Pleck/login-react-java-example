package be.technocite.auth.user.dao;

import java.util.Optional;

import be.technocite.auth.user.model.ERole;
import be.technocite.auth.user.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
