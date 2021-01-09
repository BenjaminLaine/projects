<div class="row no-gutters">
			<div class="col-sm-6 border">
			<!-- center column -->
				<div id="inner2">
					<h3>Change Password</h3>
					<form action="settings.php" autocomplete="off" method="POST">
						<div class="form-group">
							<label >Current Password</label>
							<input type="password" name="password1" class="form-control" value="" autocomplete="off">
							<span><a href="reset_password.php">Forgot your password?</a></span>
						</div>
						<?php
							if (isset($old_password_error))
								echo "<p class=\"alert alert-danger\">" . $old_password_error . "</p>";
						?>
						<div class="form-group">
							<label >New Password</label>
							<input type="password" name="new_password1" class="form-control" value="" autocomplete="off">
						</div>
						<div class="form-group">
							<label >Confirm New Password</label>
							<input type="password" name="new_password2" class="form-control" value="" autocomplete="off">
						</div>
						<?php
							if (isset($new_password_error))
								echo "<p class=\"alert alert-danger\">" . $new_password_error . "</p>";
						?>
						<div class="form-group">
							<input type="submit" class="btn btn-primary" name="change_password" value="Change Password">
						</div>
					</form>
					<?php
						if (isset($change_password_success))
							echo "<p class=\"alert alert-success\">Password changed successfully!</p>";
					?>
				</div>
				<div id="inner2">
					<h3>Change Color Theme</h3>
					<div class="custom-control custom-switch">
						<?php
							if ($_COOKIE['10GAG_theme'] == 'light.css')
								echo "<input type=\"checkbox\" class=\"custom-control-input\" id=\"customSwitch1\" onclick=\"reload()\">";
							else
								echo "<input type=\"checkbox\" class=\"custom-control-input\" id=\"customSwitch1\" checked onclick=\"reload()\">";
						?>
						<label class="custom-control-label" for="customSwitch1">Dark Theme</label>
					</div>
				</div>
			</div>
			<div class="col-sm-6 border">
				<div id="inner2">
					<h3>Change Other Settings</h3>
					<form action="settings.php" autocomplete="off" method="POST">
						<div class="form-group">
							<label >Username</label>
							<input type="text" name="username" class="form-control" value="<?php echo $username ?>">
						</div>
						<?php
							if (isset($username_error))
								echo "<p class=\"alert alert-danger\">" . $username_error . "</p>";
						?>
						<div class="form-group">
							<label >First Name</label>
							<input type="text" name="firstname" class="form-control" value="<?php echo $firstname ?>">
						</div>
						<?php
							if (isset($firstname_error))
								echo "<p class=\"alert alert-danger\">" . $firstname_error . "</p>";
						?>
						<div class="form-group">
							<label >Last Name</label>
							<input type="text" name="lastname" class="form-control" value="<?php echo $lastname ?>">
						</div>
						<?php
							if (isset($lastname_error))
								echo "<p class=\"alert alert-danger\">" . $lastname_error . "</p>";
						?>
						<div class="form-group">
							<label >Email</label>
							<input type="email" name="email" class="form-control" value="<?php echo $email ?>">
						</div>
						<?php
							if (isset($email_error))
								echo "<p class=\"alert alert-danger\">" . $email_error . "</p>";
						?>
						<div class="custom-control custom-switch">
						<?php
							if ($_SESSION['notifications'] == 0)
								echo "<input type=\"checkbox\" class=\"custom-control-input\" name=\"notifications\" id=\"customSwitch2\">";
							else
								echo "<input type=\"checkbox\" class=\"custom-control-input\" name=\"notifications\" id=\"customSwitch2\" checked>";
						?>
							<label class="custom-control-label" for="customSwitch2">Email Notifications</label>
						</div>
						<hr>
						<div class="form-group">
							<label >Enter your password</label>
							<input type="password" name="password1" class="form-control" value="" autocomplete="off"s>
						</div>
						<?php
							if (isset($password_error))
								echo "<p class=\"alert alert-danger\">" . $password_error . "</p>";
						?>
						<div class="form-group">
							<input type="submit" class="btn btn-primary" name="change_other" value="Update Settings">
						</div>
					</form>
					<?php
						if (isset($change_other_success))
							echo "<p class=\"alert alert-success\">Settings changed successfully!</p>";
					?>
				</div>
			</div>
		</div>