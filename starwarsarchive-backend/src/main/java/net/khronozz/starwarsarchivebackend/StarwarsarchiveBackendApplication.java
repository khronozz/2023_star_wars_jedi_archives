package net.khronozz.starwarsarchivebackend;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.logging.Logger;

@SpringBootApplication
public class StarwarsarchiveBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(StarwarsarchiveBackendApplication.class, args);
	}

	@Component
	static
	class CorsFilter implements Filter {
		private final Logger LOG = Logger.getLogger(CorsFilter.class.getName());
		public CorsFilter() {
		}

		@Override
		public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

			HttpServletRequest request = (HttpServletRequest) req;
			HttpServletResponse response = (HttpServletResponse) res;

			response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
			response.setHeader("Access-Control-Allow-Credentials", "true");
			response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
			response.setHeader("Access-Control-Max-Age", "3600");
			response.setHeader("Access-Control-Allow-Headers", "*");

			LOG.info("CORS filter activated for " + request.getRequestURI() + " with method " + request.getMethod());

			//If preflight request, just return OK
			if (request.getMethod().equals("OPTIONS")) {
				response.setStatus(HttpServletResponse.SC_OK);
				return;
			}

			chain.doFilter(req, res);
		}

		@Override
		public void init(FilterConfig filterConfig) {
		}

		@Override
		public void destroy() {
		}
	}

}
