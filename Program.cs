using SignalRWebpack.Hubs;

namespace SignalRWebpack
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSignalR();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            //app.MapGet("/", () => app.MapHub<ChatHub>("/hub"));
            app.MapHub<ChatHub>("/hub");
            app.Run();
        }
    }
}
