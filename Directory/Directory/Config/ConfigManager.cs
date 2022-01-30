using Microsoft.Extensions.Configuration;

namespace Directory.Config
{
    public class ConfigManager
    {
        public static IConfiguration AppSetting { get; }
        static ConfigManager()
        {
            AppSetting = new ConfigurationBuilder()
                    .SetBasePath(System.IO.Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();
        }
    }
}
