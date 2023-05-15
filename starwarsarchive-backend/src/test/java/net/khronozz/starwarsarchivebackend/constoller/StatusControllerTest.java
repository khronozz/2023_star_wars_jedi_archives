package net.khronozz.starwarsarchivebackend.constoller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(StatusController.class)
public class StatusControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void status_returnsOK() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/status"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("OK"));
    }
}
