/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strnjoin.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/11/05 02:16:18 by blaine            #+#    #+#             */
/*   Updated: 2019/11/05 23:56:05 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "./includes/libft.h"

char	*ft_strnjoin(const char *s1, const char *s2, size_t n)
{
	int		i;
	int		j;
	char	*dest;

	i = 0;
	j = 0;
	while (s1[i])
		i++;
	dest = (char*)malloc(sizeof(char) * (n + i + 1));
	i = -1;
	while (s1[++i])
		dest[i] = s1[i];
	while (s2[j] && n-- > 0)
		dest[i++] = s2[j++];
	dest[i] = '\0';
	return (dest);
}
