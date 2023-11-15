﻿using Business.Exceptions;
using Business.Models;
using Business.Models.Payloads;
using Common.Entities;

namespace Business.Services;

/// <summary>
/// Service for <see cref="Common.Entities.Login"/>
/// This is used for login attempts and password encryption.
/// </summary>
public class LoginService
{

    /// <summary>
    /// Internal dictionary for login attempts.
    /// Key is username, value is attempts.
    /// This gets updated in <see cref="TryLogin(LoginPayload)"/>
    /// </summary>
    private readonly Dictionary<string, LoginAttempt> _loginAttempts = new();
    /// <summary>
    /// <see cref="UnitOfWork"/> for database access.
    /// This is used to get <see cref="Login"/> from database in <see cref="TryLogin(LoginPayload)"/>
    /// </summary>
    private readonly UnitOfWork _uow;

    /// <summary>
    /// Constructor receives <see cref="UnitOfWork"/> through dependency injection.
    /// </summary>
    /// <param name="uow"></param>
    public LoginService(UnitOfWork uow)
    {
        _uow = uow;
    }

    public bool TryLogin(LoginPayload login)
    {
        // Check if the user has tried to login too many times
        if (_loginAttempts.ContainsKey(login.Username))
        {
            LoginAttempt attempt = _loginAttempts[login.Username];

            if (attempt.Attempts == LoginAttempt.MAX_LOGIN_ATTEMPTS 
                && !attempt.CanTryAgain) 
                throw new TooManyLoginAttemptsException(DateTime.UtcNow - attempt.AttemptStarted);
        }

        // Find a login with the given username and password and check if it exists
        bool correct = _uow.Logins.Get(l =>
            l.Username == login.Username
            && l.Password == login.Password)
            != null;

        // If the login is not correct, add 1 to the login attempts for the given username
        if (!correct)
        {
            LoginAttempt attempt = _loginAttempts.ContainsKey(login.Username) ? _loginAttempts[login.Username] : new LoginAttempt();
            attempt.Attempts++;
            _loginAttempts[login.Username] = attempt;
        }

        _loginAttempts.Remove(login.Username);
        return correct;
    }

    /// <summary>
    /// TODO: Implement password encryption
    /// </summary>
    /// <param name="login"></param>
    /// <param name="unencrypted"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public string GenerateEncrypedPassword(UserModifyPayload payload)
    {
        throw new NotImplementedException();
    }
}
