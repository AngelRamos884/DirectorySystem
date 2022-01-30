
using Microsoft.IdentityModel.Tokens;
using Directory.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Directory.Utils;

namespace Directory.Services.Token
{
    public class TokenService : ITokenService
    {
        public async Task<string> CreateToken(string username, List<RoleTypeModel> perm, int timeExp)
        {
            var claims = new List<Claim>();

            foreach (var item in perm)
            {
                claims.Add(new Claim(ClaimTypes.Role, item.Name));
            }
            claims.Add(new Claim(ClaimTypes.Name, username));

            //Set secret key to decoding the information.
            var secretBytes = Encoding.UTF8.GetBytes(C.Secret);
            var key = new SymmetricSecurityKey(secretBytes);
            var algorithm = SecurityAlgorithms.HmacSha256;
            var signingCredentials = new SigningCredentials(key, algorithm);

            //Set security to token.
            var token = new JwtSecurityToken(
                C.Audience,
                C.Issuer,
                claims,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddMinutes(timeExp),
                signingCredentials);

            //Write token.
            var tokenJSON = new JwtSecurityTokenHandler().WriteToken(token);

            await Task.FromResult(tokenJSON);

            return tokenJSON;
        }
    }
}
